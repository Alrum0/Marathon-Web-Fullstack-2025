document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    
    stones.forEach(stone => {
        let isDraggable = false; 
        let isDragging = false;
        let offsetX, offsetY;
        
        function moveStone(e) {
            stone.style.left = e.pageX - offsetX + 'px';
            stone.style.top = e.pageY - offsetY + 'px';
        }
        
        stone.addEventListener('click', (e) => {
            if (isDragging) return;
            
            isDraggable = !isDraggable;
            stone.classList.toggle('not-draggable', !isDraggable);
        });
        
        stone.addEventListener('mousedown', (e) => {
            if (!isDraggable) return;
            
            isDragging = true;
            stone.style.border = '3px dashed black';
            
            const rect = stone.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            document.addEventListener('mousemove', moveStone);
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.removeEventListener('mousemove', moveStone);
                
                if (isDraggable) {
                    stone.style.border = '3px solid transparent';
                } else {
                    stone.style.border = '3px solid black';
                }
            }
        });
    });
});