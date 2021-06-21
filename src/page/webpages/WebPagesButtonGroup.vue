<template>

    <el-row
        style="min-height: 70px;padding-top:10px; padding-bottom: 10px; line-height: 1px; border-color: #dcdcdc ;border-bottom-style: solid; border-bottom-width:1px">
        <el-col :span="2" style="width: 100px;">
            <div class="el-form-item__label">{{ name }}</div>
        </el-col>
        <el-col :span="15">

            <div>
                <el-button :icon="display_icon(item)"
                           type="primary" size="medium" :plain="handleProudctButtonSelected(index)"
                           style="margin-left: 0px;margin-bottom: 5px; margin-right: 10px"
                           v-for="(item, index) in listdata"
                           :key="item.id"
                           @click='handleProductSelect(item, index)'
                >
                    {{ item.name }}({{ item.tag ? item.tag : item.type }})
                </el-button>
                <el-button style="visibility: hidden"></el-button>
            </div>
        </el-col>

        <el-col :span="6" style="float: right">
            <el-button
                icon="el-icon-plus"
                type="success" size="medium" plain style="margin-left: 0px; margin-right: 4px;margin-bottom: 5px;"
                @click='handleAddProductSelect'
            >
                新增
            </el-button>
            <el-button
                icon="el-icon-minus"
                type="danger" size="medium" style="margin-left: 0px;margin-right: 4px;margin-bottom: 5px;"
                @click='handleDeleteSelected'

            >
                删除
            </el-button>

        </el-col>


    </el-row>

</template>

<script>
import ElCol from "element-ui/packages/col/src/col";
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

export default {
    name: 'WebPagesButtonGroup',
    data() {
        return {
            loading: true,
            productSelectedButtonIndex: -1,
            productSelectedPlant: true,
        }
    },

    props: [
        "listdata",
        "name",
        "type"
    ],

    computed: {},
    created() {
    },
    mounted() {

    },
    methods: {

        handleAddProductSelect() {
            this.$emit('handleAddSelectFn', {
                type: this.type,
            })
        },

        handleProudctButtonSelected(index) {

            if (this.productSelectedButtonIndex == index) {
                return false
            }
            return true
        },


        handleProductSelect(item, index) {

            if (this.productSelectedButtonIndex == index) {
                return
            }
            this.productSelectedButtonIndex = index;

            this.$emit('handleSelectFn', {
                type: this.type,
                selectedIndex: index,
                item: item
            });
        },

        handleDeleteSelected() {

            this.$emit('handleDeleteFn', {
                type: this.type,
            });
        },

        handlePreviewSelected() {

        },
        reset() {
            this.productSelectedButtonIndex = -1;
        },


        display_icon(item) {

            if (item.https == undefined) {
                return "";
            }

            if (item.https & item.https == true) {
                return "el-icon-success"
            } else {
                return "el-icon-error"
            }

        },
    },
    components: {
        ElButton,
        ElCol
    }
}
</script>

<style lang='less' type="text/less" scoped>

</style>
