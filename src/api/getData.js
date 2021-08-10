import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch({url:'/alps/api-token-auth',data,type:'POST'});

/**
 * 退出
 */
export const signout = () => fetch('/admin/singout');

/**
 * 获取产品组
 */
export const getProductType = () => fetch({url:'/alps/admin_group',});

/**
 * 获取单个产品组信息
 */
export const getProductTypeDetail=() => fetch({url:'/alps/admin_group',});

/**
 *  获取对应产品列表
 */
export const getProductList = (data) => fetch({url:'/alps/admin_app_list',data,type:'POST',contentType:'formData'});

/**
 *  获取对应下载页列表
 */
export const getDownloadList = (data) => fetch({url: '/alps/admin_app_download_list',data,type:'POST',contentType:'formData'})

/**
 *  获取邮件列表
 */

export const getEmailList = (data) => fetch({url: '/alps/admin_app_email_config_list',data,type:'POST',contentType:'formData'})



/**
 *  获取组列表（不包含最新的版本信息）
 */

export const getGroup = (data) => fetch({url: '/alps/admin_group_list'})


/**
 *  添加邮件地址
 */

export const addEmail = (data) => fetch({url: '/alps/admin_add_email',data,type:'POST',contentType:'formData'})


/**
 *  删除邮件地址
 */

export const deleteEmail = (data) => fetch({url: '/alps/admin_delete_email',data,type:'POST',contentType:'formData'})


/**
 *  添加下载页面
 */
export const addDownloadPage = (data) => fetch({url: '/alps/admin_add_download',data,type:'POST',contentType:'formData'})


/**
 * 新增产品组
 * @param data
 */
export const addGroup = (data) => fetch({url:'/alps/admin_add_group',data,type:'POST',contentType:'formData'});

/**
 * 新增产品组
 * @param data
 */
export const removeGroup = (data) => fetch({url:'/alps/admin_remove_group',data,type:'POST',contentType:'formData'});




/**
 * 保存设置
 * @param data
 */
export const adminSaveSettings = (data) => fetch({url:'/alps/admin_save_settings',data,type:'POST',contentType:'formData'});

/**
 * 获取设置
 * @param data
 */
export const adminGetSettings = (data) => fetch({url:'/alps/admin_get_settings',data,type:'POST',contentType:'formData'});


/**
 * 重签IPA
 * @param data
 */
export const resignIPA = (data) => fetch({url:'/alps/admin_resign_ipa',data,type:'POST',contentType:'formData'});


