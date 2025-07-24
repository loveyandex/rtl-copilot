// Function to create and add the RTL/LTR toggle button

function addToggleButton() {
    // Use the second .flex.gap-4 div as the target
    const targetDiv = document.querySelectorAll('.flex.gap-4')[1];
    if (!targetDiv) return;


    // Prevent adding the button multiple times using a unique id
    const uniqueButtonId = 'rtl-ltr-toggle-btn-2b1e4c7e-unique';
    if (targetDiv.querySelector(`#${uniqueButtonId}`)) return;

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex items-center';
    buttonContainer.style.willChange = 'auto';
    buttonContainer.style.opacity = '1';


    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = uniqueButtonId;
    toggleButton.type = 'button';
    toggleButton.className = 'relative flex items-center text-foreground-800 fill-foreground-800 active:text-foreground-600 active:fill-foreground-600 dark:active:text-foreground-650 dark:active:fill-foreground-650 bg-transparent safe-hover:bg-black/5 active:bg-black/3 dark:safe-hover:bg-white/8 dark:active:bg-white/5 text-xs justify-center size-9 rounded-xl before:rounded-xl before:absolute before:inset-0 before:pointer-events-none before:border before:border-transparent before:contrast-more:border-2 outline-2 outline-offset-1 focus-visible:z-[1] focus-visible:outline focus-visible:outline-stroke-900';
    toggleButton.title = 'Toggle RTL/LTR';
    toggleButton.setAttribute('data-spatial-navigation-autofocus', 'false');

    // Create SVG for RTL/LTR icon
    toggleButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-6">
            <path d="M4 6h10v2H4V6zm0 5h10v2H4v-2zm0 5h10v2H4v-2zm12 0h4v2h-4v-2zm0-5h4v2h-4v-2zm0-5h4v2h-4v-2z" fill="currentColor"/>
        </svg>
    `;

    // Track RTL state
    let isRTL = false;

    // Toggle functionality
    toggleButton.addEventListener('click', () => {
        isRTL = !isRTL;
        // Update message directions
        const aiMessages = document.querySelectorAll('div[data-content="ai-message"]');
        const userMessages = document.querySelectorAll('div[data-content="user-message"]');

        aiMessages.forEach(msg => {
            msg.style.direction = isRTL ? 'rtl' : 'ltr';
            // msg.style.textAlign = isRTL ? 'left' : 'left';
        });

        userMessages.forEach(msg => {
            msg.style.direction = isRTL ? 'rtl' : 'ltr';
            // msg.style.textAlign = isRTL ? 'right' : 'right';
        });

        // Update button icon or title to indicate current state
        toggleButton.title = isRTL ? 'Switch to LTR' : 'Switch to RTL';
    });

    // Append button to the target div
    buttonContainer.appendChild(toggleButton);
    targetDiv.appendChild(buttonContainer);
}

// Wait up to 5 seconds for the target div to appear, then add the button
function waitForTargetAndAddButton(timeout = 5000) {
    const interval = 100;
    let waited = 0;
    const check = () => {
        const targetDiv = document.querySelectorAll('.flex.gap-4')[1];
        if (targetDiv) {
            addToggleButton();
        } else if (waited < timeout) {
            waited += interval;
            setTimeout(check, interval);
        }
    };
    check();
}

waitForTargetAndAddButton();

// For dynamic content, observe DOM changes
const observer = new MutationObserver(() => {
    // Only add if the unique button does not exist in the target
    const targetDiv = document.querySelectorAll('.flex.gap-4')[1];
    if (targetDiv && !targetDiv.querySelector('#rtl-ltr-toggle-btn-2b1e4c7e-unique')) {
        addToggleButton();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});