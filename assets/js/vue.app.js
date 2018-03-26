;(function ( exports ) {
    'use strict'

    new Vue({
        el: '#app',
        data: {
            title: 'Home',
            aside: {},
            market: null,
            frames: {},
            logger: false,
            notify: false,
            context: null,
            viewapp: false,
            loading: true,
            setting: {},
            response: null,
            apptitle: null,
            pagetitle: 'Home',
            preventView: null,
            currentView: 'view-index',
            currentFrame: null
        },
        watch: {
            viewapp ( value ) {
                if ( !value ) this.currentFrame = null
            }
        },
        mounted () {
            this.aside = {pins: {}, apps: {}}
            this.pagetitle = this.translate( 'home' )

            document.addEventListener('click', event => this.context = null)
        }
    })
})( this );