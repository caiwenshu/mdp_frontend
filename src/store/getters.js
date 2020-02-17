

const getters = {
    adminInfo: state => state.product.adminInfo,
    defaultRouter: state => state.product.defaultRouter,
    applicationId: state => state.product.applicationId,
    appList: state => state.product.appList, // 对应产品列表
    group: state => state.product.group, // 产品组
}

export default getters