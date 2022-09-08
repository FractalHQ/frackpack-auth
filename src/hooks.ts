import type { Handle } from '@sveltejs/kit'

/**
 * Intercepts all app requests and displays a login popup.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const authorization = event.request.headers.get('Authorization')

	if (!authorization || !authorization.startsWith('Basic '))
		return new Response('Unauthorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="Protected"',
			},
		})

	const user = resolveUser(authorization)

	if (!user)
		return new Response('Unauthorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="Protected"',
			},
		})

	console.log(new Date())
	console.log(`new login: ${user.username}\n`)

	event.locals.user = {
		username: user.username,
	}

	return await resolve(event)
}

const users: AuthUser[] = JSON.parse(process.env.USERS ?? '')

/**
 * Checks USERS environment variable for submitted credentials.
 */
const resolveUser = (authorization: string): AuthUser | false => {
	const token = authorization.replace('Basic ', '')

	const [username, password] = Buffer.from(token, 'base64').toString().split(':')

	if (!username || !password || !username.length || !password.length) {
		console.warn(`rejected login: \nusername: ${username}\npassword: ${password}`)
		return false
	}

	const user = users.find((u) => u.username === username && u.password === password)

	if (!user) return false

	return {
		username,
		password,
	}
}
