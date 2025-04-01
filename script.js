document.addEventListener('DOMContentLoaded', function() {
    // Адаптивный аккордеон
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        // Улучшенное управление для touch-устройств
        header.addEventListener('click', function(e) {
            // Предотвращаем срабатывание при прокрутке
            if (e.target.classList.contains('accordion-content') || 
                e.target.closest('.accordion-content')) return;
                
            const item = this.parentNode;
            const isActive = item.classList.contains('active');
            
            // Закрываем все элементы
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // Открываем текущий, если был закрыт
            if (!isActive) {
                item.classList.add('active');
                // Прокрутка к открытому элементу
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
        
        // Оптимизация для touch-устройств
        header.style.cursor = 'pointer';
    });

    // Popup для мобильных
    const popup = document.getElementById('popup');
    const openPopupBtn = document.getElementById('openPopup');
    const closePopupBtn = document.querySelector('.close');
    
    function openPopup() {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    }
    
    function closePopup() {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }
    
    openPopupBtn.addEventListener('click', openPopup);
    closePopupBtn.addEventListener('click', closePopup);
    
    // Закрытие при клике вне popup
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Закрытие при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Вкладки с touch-оптимизацией
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Добавляем визуальный feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            const tabId = this.getAttribute('data-tab');
            
            // Анимация переключения вкладок
            tabLinks.forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.opacity = '0';
                setTimeout(() => {
                    content.classList.remove('active');
                }, 150);
            });
            
            this.classList.add('active');
            const activeTab = document.getElementById(tabId);
            activeTab.classList.add('active');
            setTimeout(() => {
                activeTab.style.opacity = '1';
            }, 150);
        });
        
        // Улучшение для touch-устройств
        link.style.cursor = 'pointer';
        link.style.userSelect = 'none';
    });
    
    // Оптимизация для мобильных устройств
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch');
    } else {
        document.documentElement.classList.add('no-touch');
    }
});