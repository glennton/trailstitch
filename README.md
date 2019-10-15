# trailstitch

## Sample Queries:

### Get Users
```
query{
  getUser(num: 1){
    id
    name
    username
    address{
      street
      suite
      city
      zipcode
      geo{
        lat
        lng
      }
    }
  }
}
```

### Get all users
query{
  getAllUsers{
    id
    name
    username
    address{
      street
      suite
      city
      zipcode
      geo{
        lat
        lng
      }
    }
  }
}