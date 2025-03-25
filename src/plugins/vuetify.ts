// src/plugins/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VCalendar } from 'vuetify/labs/VCalendar'

// Define custom theme
const customTheme = {
    dark: false,
    colors: {
        primary: getComputedStyle(document.documentElement).getPropertyValue('--vt-c-indigo').trim(),
        secondary: '#FFC107',
        background: '#FFF',
        'danger': '#a3211f',
    }
}

// Vuetify instance
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'customTheme',
        themes: {
            customTheme,
        }
    },
    icons: {
        defaultSet: 'mdi',
    },
})

export default vuetify
