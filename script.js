document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('header button.md\\:hidden');
    const nav = document.querySelector('header nav');
    
    if (btn && nav) {
        const ul = nav.querySelector('ul');
        
        btn.addEventListener('click', () => {
            const isHidden = nav.classList.contains('hidden');
            
            if (isHidden) {
                // Open menu
                nav.classList.remove('hidden');
                nav.classList.add('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'bg-surface', 'dark:bg-inverse-surface', 'shadow-lg', 'p-4', 'z-50', 'w-full');
                nav.classList.remove('items-center', 'justify-between');
                
                if (ul) {
                    ul.classList.remove('space-x-8');
                    ul.classList.add('flex-col', 'space-y-4', 'mb-4', 'w-full');
                }
            } else {
                // Close menu
                nav.classList.add('hidden');
                nav.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'bg-surface', 'dark:bg-inverse-surface', 'shadow-lg', 'p-4', 'z-50');
                nav.classList.add('items-center', 'justify-between');
                
                if (ul) {
                    ul.classList.add('space-x-8');
                    ul.classList.remove('flex-col', 'space-y-4', 'mb-4', 'w-full');
                }
            }
        });
    }
});
