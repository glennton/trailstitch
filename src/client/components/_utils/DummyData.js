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
      id: 'ff3f549d-668a-4be7-8ca1-86005dc34a41',
      imgUrl: `http://glennroman.com/trailstitch/images/DSC03858-HDR.jpg`,
      locName: `Ansel Adams Wilderness`,
      subText: `Eu veniam anim laboris aliqua ipsum nostrud laboris consectetur voluptate esse labore anim proident.`,
      linkUrl: ``,
      publicUserId: `22`,
      lat: 37.72582836449146, 
      lng: -119.13531756028533, 
      features: {
        gpsTrax: true,
        pictures: true,
        blogNotes: true
      }
      },
    {
      id: 'ff3f549d-668a-4be7-8ca1-86005dc334a41',
      imgUrl: `http://glennroman.com/trailstitch/images/DSC02492.jpg`,
      locName: `Ruby Lake`,
      subText: `Duis occaecat sint laboris et consequat aliquip veniam reprehenderit consequat Lorem qui ea qui.`,
      linkUrl: ``,
      publicUserId: `22`,
      lat: 37.72582836449146, 
      lng: -119.13531756028533, 
      features: {}
      },
    {
      id: 'ff3f549d-668a-4be7-8ca1-826005dc34a41',
      imgUrl: `http://glennroman.com/trailstitch/images/DSC02425.jpg`,
      locName: `Yosemite National Park`,
      subText: `Duis occaecat sint laboris et consequat aliquip veniam reprehenderit consequat Lorem qui ea qui.`,
      linkUrl: ``,
      publicUserId: `22`,
      locCoords: {
        lat: `21|58|37.72|N`,
        lng: `81|13|28.53|W`
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
