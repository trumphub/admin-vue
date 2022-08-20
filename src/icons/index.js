import Vue from "vue";
import SvgIcon from '@/components/SvgIcon'

Vue.component(SvgIcon.name, SvgIcon)

const context = require.context('./svg', false, /\.svg$/)

context.keys().forEach(context)
