import serve from "./request"

// 登陆接口
export const login = (data) => {
	return serve.post("/login.json", data)
}

// 注册接口
export const register = (data) => {
	return serve.post("/register.json", data)
}

// 首页产品接口
export const getHomeListData = (data) => {
	return serve.post("/homeList.json", data)
}