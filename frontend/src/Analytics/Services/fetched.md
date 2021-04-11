[
  {user1, ...data}
  {user2, ...data}
  {user3, ...data}
  ...
]

specific data returned:
User {
  gender
  hyperlinks
  pagetime
  userid
  userinput
  videos
  workbook_progress
}

going to be turned into:

[
  {workbook1: {
    videos: [
      {user1 : data}
      {user2 : data}
      {user3 : data}
      ...
    ]
    hyperlinks: [
      {user1: data}
      {user2: data}
      {user3: data}
      ...
    ]
    ...
  }}
]


OR

[
  {workbook1 : [
    {user1: {
      videos: data,
      hyperlinks: data,
      pagetime: data,
      userinput: data,
      pageprogress: data
    }},
    {user2: {
      ...data
    }}
  ]}
]
