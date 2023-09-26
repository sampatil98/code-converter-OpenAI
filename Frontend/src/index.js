document.addEventListener('DOMContentLoaded', () => {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
  
    require(['vs/editor/editor.main'], () => {
      // Initialize the input editor
      const editor = monaco.editor.create(document.getElementById('editor'), {
        value: `// write your code here..`,
  
        language: 'javascript',
        theme: 'vs-dark',
      });
  
      // Initialize the output editor
      const outputEditor = monaco.editor.create(document.getElementById('outputEditor'), {
        value: '',
        language: 'javascript', // Set the appropriate language for the output
        theme: 'vs-dark',
        readOnly: true, // Make the output editor read-only
      });




  
      const targetLanguage = document.getElementById('targetLanguage');
      const convertButton = document.getElementById('convertButton');
      const degubButton = document.getElementById('degubButton');
      const qualityCheckButton = document.getElementById('qualityCheckButton');

        const loader = document.getElementById('loader');
        const content = document.getElementById('content');
        const copybtn=document.getElementById("copy");

        loader.style.display = 'none';
        content.classList.remove('hidden');
    

    copybtn.addEventListener("click",()=>{
    
        const data = outputEditor.getValue();
        console.log(data);
        copyToClipboard(data);
    
        // Provide visual feedback (optional)
        const feedbackElement = document.getElementById('copyFeedback');
        feedbackElement.style.display = 'block';
        setTimeout(function() {
            feedbackElement.style.display = 'none';
        }, 2500);
    })
    

      const baseUrl = `https://zany-shirt-elk.cyclic.app`

      convertButton.addEventListener('click', async () => {
        const code = editor.getValue(); // Get code from the input editor
        const selectedLanguage = targetLanguage.value;
        
       

        // Show loader
        loader.style.display = 'block';
        

        const response = await fetch(`${baseUrl}/api/codeConversion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, targetLanguage: selectedLanguage }),
        });
  
        if (response.ok) {
          const data = await response.json();
          
          loader.style.display = 'none';
        content.classList.remove('hidden');

            // Set the converted code in the output editor
          outputEditor.setValue(data.convertedCode);
        } else {
            loader.style.display = 'none';
            content.classList.remove('hidden');

          outputEditor.setValue('Conversion failed. Please try again.');
        }
      });
  
      degubButton.addEventListener('click', async () => {
        const code = editor.getValue(); // Get code from the input editor
        // const selectedLanguage = targetLanguage.value;
        
        loader.style.display = 'block';

        const response = await fetch(`${baseUrl}/api/codeDebugging`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
  
        if (response.ok) {
          const data = await response.json();
          loader.style.display = 'none';
        content.classList.remove('hidden');

          // Set the converted code in the output editor
          outputEditor.setValue(data.convertedCode);
        } else {
            loader.style.display = 'none';
        content.classList.remove('hidden');

          outputEditor.setValue('Conversion failed. Please try again.');
        }
      });
  
      qualityCheckButton.addEventListener('click', async () => {
        const code = editor.getValue(); // Get code from the input editor
        // const selectedLanguage = targetLanguage.value;

        loader.style.display = 'block';
  
        const response = await fetch(`${baseUrl}/api/codeQualityCheck`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Set the converted code in the output editor
          loader.style.display = 'none';
          content.classList.remove('hidden');
          outputEditor.setValue(data.convertedCode);
        } else {

            loader.style.display = 'none';
        content.classList.remove('hidden');
          outputEditor.setValue('Conversion failed. Please try again.');
        }
      });
    });
  });

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}
  
  


  
  