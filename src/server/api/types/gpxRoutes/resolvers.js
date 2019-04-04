import GpxRoute from './model'

const resolvers = {
  Query: {
    // async exampleFunction(obj, params, context, info){

    // }
  },
  Mutation: {
    async createGpxRoute(root, params) {
      const defineNewGpx = async () => {
        try {
          const { name, id, totalDistance, dayCount, dateFirst, dateLast, trackPtCount } = params;
          return new GpxRoute({
            name,
            id,
            totalDistance,
            dayCount,
            dateFirst,
            dateLast,
            trackPtCount,
          });
        } catch (error) {
          throw error;
        }
      };
      try {
        const gpxData = await defineNewGpx();
        return GpxRoute.createGpxRoute(gpxData);
      } catch (error) {
        throw error;
      }
    }    
  }
}

export default resolvers