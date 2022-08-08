import request from "@/api";


// 新增用户
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}



export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}



//新增用户
export function add(data) {
    return request({
        url: '/user',
        method: 'post',
        data: data
    })
}

//修改用户
export function put(data) {
    return request({
        url: '/user',
        method: 'put',
        data: data
    })
}

//删除用户用户
export function deleteUser(userid) {
    return request({
        url: '/user/'+userid,
        method: 'delete'
    })
}


export function listUser(data) {
    return request({
        url: '/user',
        method: 'get',
        params: data
    })
}

export function getInfo() {
    return request({
        url: '/user/getInfo',
        method: 'get'
    })
}


export function getById(id) {
    return request({
        url: '/user/'+id,
        method: 'get'
    })
}



// // 新增用户
// // 查询用户列表
// export function listUser(query) {
//     return request({
//         url: '/user',
//         method: 'get',
//         params: query
//     })
// }

// // 新增用户
// export function addUser(data) {
//     return request({
//         url: '/user',
//         method: 'post',
//         data: data
//     })
// }