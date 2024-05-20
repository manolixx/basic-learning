export default {
    data() {
        return {
            msg: 'im extends',
            obj: {
                title: 'extendsTItle',
                header: 'extendsHeader'
            }
        }
    },
    created() {
        console.log('extends created')
    }
}