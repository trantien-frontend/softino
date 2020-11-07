const loading = {
    init: function() {
        this.load();
    },
    load:function() {
        const loaddingItem = document.querySelector('.loading');
        window.addEventListener('load',()=>{
            setTimeout(() => {
                loaddingItem.classList.add('loading--off');
            }, 2000);
        })
    }
}
loading.init();