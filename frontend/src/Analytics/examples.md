user {
  email
  provider
  password
  rpt
  ct
  confirmed
  blocked
  role
  additionalPermissions
  diseases
  gender

  pagetime {
    workbook1 {
      page 1 { 6 }
      page 2 { 7 }
      page 3 { 8 }
    }

    workbook2 {
      page 1 { 5 }
      page 2 { 10 }
    }
  }

  pageprogress {
    workbook 1 { 3 }
    workbook 2 { 2 }
  }

  hyperlinks {
    workbook 1 { }
    workbook 2 {
      page 2 { link { 3 }}
    }
  }

  videos {
    workbook 1 {
      page 1 {
        {link 1 { 50 } }
      }
      page 2 {
        {link 2 { 0 } }
      }
    }
    workbook 2 { }
  }

  userinput {
    workbook 1 {
      page 3 {
        input 1 { blah }
        input 2 { blah2 }
      }
    }
  }

}