import fetch from '@/config/fetch'

/**
 * 获取webpages 类型组
 * @param data
 */
export const getWebPagesType = (data) => fetch({url:'/webpages/admin_webpages_type'})

/**
 * 获取网页列表
 * @param data
 */
export const getWebPagesHtmlList = (data) => fetch({url:'/webpages/admin_webpages_html',data,type:'POST',contentType:'formData'});

/**
 * 新增产品组
 * @param data
 */
export const addWebPagesType = (data) => fetch({url:'/webpages/admin_add_webpages_type',data,type:'POST',contentType:'formData'});

/**
 * 新增网页
 * @param data
 */
export const addWebPagesContentHtml = (data) => fetch({url:'/webpages/admin_add_webpages_content_html',data,type:'POST',contentType:'formData'});

/**
 * 删除产品组
 * @param data
 */
export const deleteWebPagesType = (data) => fetch({url:'/webpages/admin_delete_webpages_type',data,type:'POST',contentType:'formData'});
