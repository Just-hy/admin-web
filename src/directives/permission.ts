import { Directive } from 'vue'
import { menuStore } from '@/store/menu/index';
export const permission: Directive = {
    mounted(el, binding) {
        const store = menuStore()
        const { value } = binding;
        const permissions = store.authList;
        if (value && value instanceof Array && value.length > 0) {
            const permissionRoles = value;
            const hasPermission = permissions.some((role) => {
                return permissionRoles.includes(role)
            })
            if (!hasPermission) {
                el.style.display = 'none'
            }
        } else {
            throw new Error('need roles! Like v-permission="[\'add\',\'edit\']"')
        }
    }
}