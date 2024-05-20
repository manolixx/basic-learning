export default {
    data() {
        return {
            msg: 'im mixin',
            obj: {
                title: 'mixinTItle',
                header: 'mixinHeader'
            }
        }
    },
    created() {
        console.log('mixin created')
    }
}