<template>
    <div class='btnContainer'>
        <el-row style='margin-top:-20px;'>
            <el-button autofocus=true type="primary" plain @click='iosFn'>ios</el-button>
            <el-button type="success" plain @click='AndroidFn'>Android</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props:['iosId','androidId'],
        methods: {
            iosFn() {
                this.$store.commit('SELECT_IOS_ANDROID',this.iosId)
                this.$emit('iosFn',this.iosId)
            },
            AndroidFn() {
                this.$store.commit('SELECT_IOS_ANDROID',this.androidId)
                this.$emit('iosFn',this.androidId)
            }
        }
    }
</script>

<style lang='less'>
    .btnContainer {
        text-align: center;
    }
</style>