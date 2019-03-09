# trailstitch

## Sample Queries:

### Get Users
```
query{
  getUsers(num: 1){
    id
    name
    address{
      street
    }
  }
}
```