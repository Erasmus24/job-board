import Link from 'next/link'
import { useRouter } from 'next/router'

const Job = ({ job, isDashboard }) => {
  const router = useRouter()

  return (
    <div className='mb-4 mt-20 pl-16 pr-16'>
      <Link href={`/job/${job.id}`}>
        <a className='text-xl font-bold underline'>{job.title}</a>
      </Link>
      <h2 className='text-base font-normal mt-3'>{job.description}</h2>
      <div className='mt-4'>
        {isDashboard && job.published && (
          <span
            className='bg-black text-white uppercase text-sm p-2 mr-5 cursor-pointer'
            onClick={async () => {
              await fetch('/api/job', {
                body: JSON.stringify({
                  id: job.id,
                  task: 'unpublish',
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'PUT',
              })
              router.reload(window.location.pathname)
            }}
          >
            ✅ Published
          </span>
        )}
        {isDashboard && !job.published && (
          <span
            className='bg-black text-white uppercase text-sm p-2 mr-5 cursor-pointer'
            onClick={async () => {
              await fetch('/api/job', {
                body: JSON.stringify({
                  id: job.id,
                  task: 'publish',
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'PUT',
              })
              router.reload(window.location.pathname)
            }}
          >
            ❌ Unpublished
          </span>
        )}

        <h4 className='inline'>Posted by</h4>
        <div className='ml-1 -mt-6 inline'>
          <span className='text-base font-medium color-primary underline'>
            {job.author.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Job


// import prisma from 'lib/prisma'
// import { getSession } from 'next-auth/react'

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(501).end()
//   }

//   const session = await getSession({ req })

//   if (!session) return res.status(401).json({ message: 'Not logged in' })

//   const user = await prisma.user.findUnique({
//     where: {
//       id: session.user.id,
//     },
//   })

//   if (!user) return res.status(401).json({ message: 'User not found' })

//   if (req.method === 'POST') {
//     if (!req.body.title)
//       return res
//         .status(400)
//         .json({ message: 'Required parameter title missing' })
//     if (!req.body.description)
//       return res
//         .status(400)
//         .json({ message: 'Required parameter description missing' })
//     if (!req.body.location)
//       return res
//         .status(400)
//         .json({ message: 'Required parameter location missing' })
//     if (!req.body.salary)
//       return res
//         .status(400)
//         .json({ message: 'Required parameter salary missing' })

//     await prisma.job.create({
//       data: {
//         title: req.body.title,
//         description: req.body.description,
//         location: req.body.location,
//         salary: req.body.salary,
//         author: {
//           connect: { id: user.id },
//         },
//       },
//     })

//     res.status(200).end()
//   }
// }