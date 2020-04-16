const { GraphQLServer } = require('graphql-yoga')
const fs = require('fs')
const banners = JSON.parse(fs.readFileSync('./datas/banners.json').toString())


const resolvers = {
    Query: {
        banner(parent, args) {
            return banners.find(banner => banner.id === args.id)
        },
        banners() {
            return banners
        }
        
    },
    Mutation: {
        createBanner(parent, args, context, info) {
            let { time, screen, name_en, name_ar, redirection, start_date, end_date, active } = args.data
            return {
                id: 5,
                time, 
                screen, 
                name_en, 
                name_ar, 
                redirection, 
                start_date,
                 end_date, 
                 active
            }
        },
        updateBanner(parent, args, context, info) {
            let {bannerId, data } = args
            let banner = banners.find(banner => banner.id == bannerId)
            let updatedBanner = {
                id: bannerId,
                ...banner,
                ...data,
            }
            return updatedBanner
        },
        deleteBanner(parent, args, context, info) {
            let { bannerId } = args
            let banner = banners.find(banner => banner.id == bannerId)
            return {
                ...banner,
            }
        }
    }
}
const server = new GraphQLServer({
    typeDefs: `${__dirname}/typeDefs.graphql`,
    resolvers,
})

/**
 * Start Graphql Server
 */
let port = process.env.PORT || 4000
server.start({ port }, ({ port }) => {
    console.log('Grapgql server working at http://localhost:' + port)
})
