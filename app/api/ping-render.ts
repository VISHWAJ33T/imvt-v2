// Add header for cron
// add this to vercel.cron
// "crons": [
//   {
//     "path": "/api/ping-render",
//     "schedule": "*/15 * * * *"
//   }
// ]

// import type { NextApiRequest, NextApiResponse } from 'next'
// import https from 'https'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const url = 'https://consumet-p8xj.onrender.com'

//   return new Promise((resolve, reject) => {
//     const req = https.get(url, (response) => {
//       if (response.statusCode === 200) {
//         res.status(200).json({ message: 'Server pinged successfully' })
//         resolve(null)
//       } else {
//         res.status(response?.statusCode || 500).json({ error: `Server ping failed with status code: ${response.statusCode}` })
//         reject(new Error(`Server ping failed with status code: ${response.statusCode}`))
//       }
//     })

//     req.on('error', (error) => {
//       res.status(500).json({ error: error.message })
//       reject(error)
//     })

//     req.end()
//   })
// }
