// import { anonymousApi } from '@axios/AnonymousAxios'
// import { addTotalDeRefresh, totalDeRefresh } from '@axios/AnonymousInterceptors'
// import { api } from '@axios/axios'
// import { setFailedRequestQueue, setIsRefresh } from '@axios/interceptors'
// import { usePathToUrl } from '@hooks'
// import { baseURLs, methodsAuth } from '@routes'
// import { AxiosError } from 'axios'

// export const authRefreshHandle = (
//   err: any,
//   totalDeRefresh: number,
//   useFormData?: boolean,
//   isRefreshing?: boolean,
//   failedRequestQueue?: any[]
// ) => {
//   const originalReq = err.config
//   const loginResponseDTO = sessionStorage.getItem('LoginResponseDTO')
//   if (err.response.status == 401 && totalDeRefresh >= 3) {
//     return (window.location.href = '/login')
//   }
//   if (!isRefreshing) {
//     setIsRefresh(true)
//     if (
//       err.response.status == 401 &&
//       loginResponseDTO &&
//       err.config &&
//       !err.config._retry &&
//       totalDeRefresh < 3
//     ) {
//       totalDeRefresh += 1
//       originalReq._retry = true
//       let res = api
//         .post(usePathToUrl(baseURLs.auth, { method: methodsAuth.refresh }), {
//           RefreshRequestDTO: {
//             sessionID: JSON.parse(loginResponseDTO).sessionID,
//             accessToken: JSON.parse(loginResponseDTO).accessToken,
//             refreshToken: JSON.parse(loginResponseDTO).refreshToken,
//           },
//         })
//         .then((res) => {
//           sessionStorage.setItem('LoginResponseDTO', JSON.stringify(res.data.LoginResponseDTO))
//           originalReq.headers['Authorization'] = `Bearer ${res.data.LoginResponseDTO.accessToken}`
//           originalReq.headers['Content-Type'] = !useFormData
//             ? 'application/json'
//             : 'multipart/form-data'

//           if (
//             err.response.config.url === usePathToUrl(baseURLs.auth, { method: methodsAuth.check })
//           )
//             return
//           failedRequestQueue.forEach((request) =>
//             request.onSuccess(res.data.LoginResponseDTO.accessToken)
//           )
//           // Limpa a fila de requisições que falharam
//           setFailedRequestQueue([], 'clear')

//           return api(originalReq)
//         })
//         .catch((err) => {
//           // Retorna os erros que estão salvos na fila de requisições que falharam
//           failedRequestQueue.forEach((request) => request.onFailure(err))
//           // Limpa a fila de requisições que falharam
//           setFailedRequestQueue([], 'clear')
//         })
//         .finally(() => {
//           setIsRefresh(false)
//         })
//       return res
//     }
//   }
//   return new Promise((resolve, reject) => {
//     // Adiciona a requisição na fila de requisições que falharam com as informações necessárias para refazer a requisição novamente
//     setFailedRequestQueue({
//       // Se a requisição der sucesso, chama o onSuccess
//       onSuccess: (token: string) => {
//         // Adiciona o novo token gerado no refresh token no header de autorização
//         originalReq.headers['Authorization'] = `Bearer ${token}`

//         // Faz a requisição novamente passando as informações originais da requisição que falhou
//         resolve(api(originalReq))
//       },
//       // Se a requisição der erro, chama o onFailure
//       onFailure: (err: AxiosError) => {
//         // Se não for possivel refazer a requisição, retorna o erro
//         reject(err)
//       },
//     })
//   })
// }

// export const authAnonymousRefreshHandle = (err: any) => {
//   const originalReq = err.config
//   const anonymousLoginResponseDTO = sessionStorage.getItem('AnonymousLoginResponseDTO')
//   if (err.response.status == 401 && totalDeRefresh >= 3) {
//     return (window.location.href = '/login')
//   }

//   if (
//     err.response.status == 401 &&
//     anonymousLoginResponseDTO &&
//     err.config &&
//     !err.config._retry &&
//     totalDeRefresh < 3
//   ) {
//     addTotalDeRefresh()

//     originalReq._retry = true
//     let res = anonymousApi
//       .post(baseURLs.postAnonymousRefresh, {
//         RefreshRequestDTO: {
//           sessionID: JSON.parse(anonymousLoginResponseDTO).sessionID,
//           accessToken: JSON.parse(anonymousLoginResponseDTO).accessToken,
//           refreshToken: JSON.parse(anonymousLoginResponseDTO).refreshToken,
//         },
//       })
//       .then((res) => {
//         sessionStorage.setItem(
//           'AnonymousLoginResponseDTO',
//           JSON.stringify(res.data.LoginResponseDTO)
//         )
//         originalReq.headers['Authorization'] = `Bearer ${res.data.LoginResponseDTO.accessToken}`
//         originalReq.headers['Content-Type'] = 'application/json'

//         if (err.response.config.url === baseURLs.auth) return

//         return anonymousApi(originalReq)
//       })
//     return res
//   }
// }
