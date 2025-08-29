document.querySelectorAll('.copy-btn').forEach(button => {
           button.addEventListener('click', async () => {
             const codeBlock = button.parentElement.querySelector('code');
             const text = codeBlock.innerText;
             try {
               await navigator.clipboard.writeText(text);
               const oldText = button.textContent;
               button.textContent = "Copied!";
               setTimeout(() => button.textContent = oldText, 1500);
             } catch (err) {
               alert("Failed to copy text: " + err);
             }
           });
         });