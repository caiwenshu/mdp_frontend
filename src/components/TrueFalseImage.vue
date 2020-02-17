<template>
    <img
        v-if="!!status"
        :src = 'successImgPath'
        alt='true'
    />
    <img
        v-else
        :src = 'failImgPath'
        alt='false'
    />

</template>

<script>

    export default {
        name: 'TrueFalseImage',
        data() {
            return {
                successImgPath:require('../assets/svg/icon-yes.svg'),
                failImgPath:require('../assets/svg/icon-no.svg'),
            }
        },

        props:{
            status: {
                type: Boolean,
                required: true,
                default() {
                    return false
                }
            }
        },

        computed: {

        },
        created() {
        },
        mounted(){

        },
        methods: {
        },
        components:{
        }
    }
</script>

<style lang='less' type="text/less" scoped>

</style>
