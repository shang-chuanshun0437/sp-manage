/*
 * Email:519983770@qq.com
 */

//注册用的URL
export const GET_VERIFYCATION_CODE = "/user/getVerificationCode"; //获取验证码
export const REGISTER_URL = "/user/register"; //注册
export const LOGIN_URL = "/user/login"; //登录

//用户信息
export const USER_INFO_URL = "/user/query/userInfo"; //获取用户信息
export const USER_INFO_UPDATE_URL = "/user/update/userInfo"; //更新用户信息

//店铺
export const STORE_LIST_URL = "/store/query/list"; //获取店铺列表
export const ADD_STORE_URL = "/store/add"; //添加店铺
export const DELETE_STORE = "/store/delete"; //删除店铺
export const UPDATE_STORE = "/store/update"; //更新店铺
export const DEVICE_BIND4USER_URL = "/user/device/bindDevice4User"; //为其他用户绑定设备
export const DEVICE_UNBIND4USER_URL = "/user/device/unbindDevice4User"; //设备管理员解绑其他用户的设备
export const MODIFY_EXPIRE_URL = "/user/device/modify/user"; //设备管理员修改用户的有效期
export const QUERY_STORE_SALES_URL = "/user/query/all/sales"; //查询所有店铺的销售总额
export const QUERY_STORE_PERIOD_SALES_URL = "/user/query/time/period/sales"; //查询店铺在每一段时间的销售额度
export const QUERY_STOREID_SALES_URL = "/store/order/statistic"; //查询店铺在每一段时间的销售额度

//餐桌
export const ADD_STORE_TABLE_URL = "/store/table/add"; //添加餐桌
export const QUERY_STORE_TABLE_URL = "/store/table/query/list"; //查询餐桌列表
export const UPDATE_STORE_TABLE_URL = "/store/table/update"; //更新餐桌
export const DELETE_STORE_TABLE_URL = "/store/table/delete"; //删除餐桌

//菜单
export const ADD_MENU_URL = "/store/menu/add"; //添加菜单
export const DELETE_MENU_URL = "/store/menu/delete"; //删除菜单
export const UPDATE_MENU_STATUS_URL = "/store/menu/update/statusAndRecommend"; //更新菜单
export const UPDATE_MENU_URL = "/store/menu/update"; //更新菜单
export const QUERY_MENU_URL = "/store/menu/query/list"; //查询菜单
export const QUERY_SINGLE_MENU_URL = "/store/menu/query"; //查询单个菜单

//订单
export const ADD_ORDER = "/store/order/add"; //添加订单
export const PAY_ORDER = "/store/order/pay"; //结账
export const QUERY_ORDER = "/store/order/query/list"; //查询订单列表
export const QUERY_ORDER_INFO = "/store/order/info/query"; //查询订单详情
export const DELETE_ORDER = "/store/order/delete"; //删除订单
export const DELETE_ORDER_INFO = "/store/order/info/delete"; //删除订单中的某一个商品
export const ADD_ORDER_INFO = "/store/order/info/add"; //向订单中增加一个商品
export const EXPORT_REPORT = "/export/report/excel"; //导出报表

//会员
export const QUERY_VIP = "/store/vip/query/list"; //查询会员列表
export const ADD_VIP = "/store/vip/add"; //添加会员
export const DELETE_VIP = "/store/vip/delete"; //删除会员
export const UPDATE_VIP = "/store/vip/update"; //更新会员
export const QUERY_VIP_CONSUME_RECORD = "/store/vip/query/consume"; //查询会员消费记录
export const QUERY_ADD_NUM = "/store/vip/query/addNum"; //查询在某段时间内vip的新增数量
export const QUERY_ALL_VIP_CONSUME = "/store/vip/query/allVip/consume"; //查询在某段时间内所有vip的消费金额
export const QUERY_ALL_VIP_CONSUME_PERCENT = "/store/vip/query/allVip/consume/percent"; //查询在某段时间内所有vip的消费金额所占比例
export const QUERY_VIP_NUM = "/store/vip/query/list/count"; //查询会员数量

//上传资源
export const UPLOAD_IMG_URL = "/upload/img"; //上传图片


//用户设备
export const DEVICE_USER_URL = "/user/device/manage/queryUserList"; //查询管理员设备下的所有用户

//账户
export const ACCOUNT_INFO_URL = "/user/query/userInfo"; //查询账户详情
export const ACCOUNT_UPDATE_URL = "/user/update/userInfo"; //更新账户
export const MODIFY_PWD_URL = "/user/modifyPassword"; //修改账户的密码

//查询用户
export const QUERY_USER_URL = "/admin/user/query/allUser"; //查询所有商家
export const ADD_USER_URL = "/admin/user/add"; //添加商家
export const DELETE_USER_URL = "/admin/user/delete"; //删除商家
export const UPDATE_USER_URL = "/admin/user/update"; //更新商家

//接口耗时统计
export const INTERFACE_ACCESS = "/interface/access/queryList"; //接口耗时统计

//角色列表
export const ROLE_LIST = "/role/queryList"; //角色列表
export const ROLE_ADD = "/role/addRole"; //添加角色
export const ROLE_UPDATE = "/role/updateRole"; //更新角色
export const ROLE_DELETE = "/role/deleteRole"; //删除角色

//用户角色
export const ROLE_USER_LIST = "/role/user/queryRoleUser"; //用户角色列表
export const ROLE_USER_ADD_LIST = "/role/user/addRole"; //添加管理员
export const ROLE_USER_DELETE = "/role/user/deleteRoleUser"; //删除管理员

//短信统计
export const VERIFY_CODE_URL = "/verifyCode/query/list"; //查询短信记录

