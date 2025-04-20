import axios from "axios"
import { ElMessage } from 'element-plus'

const serve = axios.create({
	baseURL: "/api",
	timeout: 10000,
})

serve.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		console.log(error)
	}
)

serve.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			return response.data
		}
		ElMessage.error("Request Error")
	},
	(error) => {
		console.log(error)
		ElMessage.error("Request Error")
	}
)

export default serve
