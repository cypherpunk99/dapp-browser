;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();

        let notify = form.querySelector( '.alert' );

        API.Http.post('/web', {message_type: 'logger', message: {value: form.message.value}}, response => {
            console.log( 'response' )
            notify.classList.remove( 'd-none' );
        })
    });
})();