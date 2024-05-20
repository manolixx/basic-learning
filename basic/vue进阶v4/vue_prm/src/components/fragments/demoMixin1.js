export default {
    data() {
        return {
            msg: 'im mixin1',
            obj: {
                title: 'mixinTItle1',
                header: 'mixinHeader1'
            }
        }
    },
    created() {
        console.log('mixin1 created')
    }
}