const data = {
  publicUsers: [
    {
      publicUserName: `Glenn`,
      publicUserId: `22`,
      publicProfilePicUrl: `` 
    }
  ],
  slides: [
    {
      imgUrl: `http://glennroman.com/trailstitch/images/DSC03858-HDR.jpg`,
      locName: `Ansel Adams Wilderness`,
      subText: `Eu veniam anim laboris aliqua ipsum nostrud laboris consectetur voluptate esse labore anim proident.`,
      linkUrl: ``,
      publicUserId: `22`,
      locCoords: {
        lat: `21|58|37.72|N`,
        lon: `81|13|28.53|W`
      },
      features: {
        gpsTrax: true,
        pictures: true,
        blogNotes: true
      }
      },
    {
      imgUrl: `http://glennroman.com/trailstitch/images/DSC02492.jpg`,
      locName: `Ruby Lake`,
      subText: `Duis occaecat sint laboris et consequat aliquip veniam reprehenderit consequat Lorem qui ea qui.`,
      linkUrl: ``,
      publicUserId: `22`,
      locCoords: {
        lat: ``,
        lon: ``
      },
      features: {}
      },
    {
      imgUrl: `http://glennroman.com/trailstitch/images/DSC02425.jpg`,
      locName: `Yosemite National Park`,
      subText: `Duis occaecat sint laboris et consequat aliquip veniam reprehenderit consequat Lorem qui ea qui.`,
      linkUrl: ``,
      publicUserId: `22`,
      locCoords: {
        lat: `21|58|37.72|N`,
        lon: `81|13|28.53|W`
      },
      features: {}
      }
    ],
  pageNavItems: [
    {
      linkName: `Home`,
      linkPath: `/`
      },
    {
      linkName: `Albums`,
      linkPath: `/albums`
      },
    {
      linkName: `stitches`,
      linkPath: `/stitches`
      },
    {
      linkName: `upload`,
      linkPath: `/upload`
      },
    {
      linkName: `editor`,
      linkPath: `/editor`
    },
    {
      linkName: `account`,
      linkPath: `/account`
    }
  ]
}

function DummyData(arr) {
  let res = {};
  arr.map( (e) =>{
    if (typeof(e) === 'string' && data[e]){
      res[e] = data[e]
    }
  })
  return res;
}

export default DummyData;
