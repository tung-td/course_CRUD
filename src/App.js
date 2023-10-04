import { useState } from "react";
var initCourses = [
  {
    id: '1',
    name: 'Javascript',
    description: 'Đây là khóa học Javascript cơ bản',
    coin: 100
  },
  {
    id: '2',
    name: 'HTML - CSS',
    description: 'Đây là khóa học HTML - CSS',
    coin: 200
  },
  {
    id: '3',
    name: 'ReactJS',
    description: 'Đây là khóa học ReactJS',
    coin: 0
  },
  {
    id: '4',
    name: 'NodeJS',
    description: 'Đây là khóa học NodeJS',
    coin: 300
  },
  {
    id: '5',
    name: 'PHP',
    description: 'Đây là khóa học PHP',
    coin: 150
  }
]

const App = () => {

  const [courses, setCourses] = useState(initCourses);
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [coin, setCoin] = useState('')
  const [errName, setErrname] = useState('')
  const [errDes, setErrDes] = useState('')
  const [errCoin, setErrCoin] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValue = {};
    for (const el of e.target) {
      if (el.name) {
        formValue[el.name] = el.value
      }
    }
    var check = true;
    if (!formValue['name']) {
      setErrname('Vui lòng nhập tên')
      check = false
    } else if (!formValue['description']) {
      setErrDes('Vui lòng nhập mô tả')
      check = false
    } else if (!formValue['coin']) {
      setErrCoin('Vui lòng nhập giá tiền')
      check = false
    }

    function generateUuid() {
      return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    if (check) {
      if (formValue['id']) {
        var edId = formValue['id']
        var idx = courses.findIndex(e => e.id == edId)
        courses.splice(idx, 1, formValue)
        setCourses(courses)
        setId('')
        setName('')
        setDescription('')
        setCoin('')
        setIsUpdate(false)
      } else {
        formValue['id'] = generateUuid()
        var newCourses = [
          ...courses,
          formValue
        ]
        setCourses(newCourses)
        setName('')
        setDescription('')
        setCoin('')
      }
    }
  }

  const handleClickEdit = (e) => {
    setId(e.id)
    setName(e.name)
    setDescription(e.description)
    setCoin(e.coin)
    setIsUpdate(true)
  }

  const handleClickDelete = (e) => {
    if (window.confirm("Bạn có muốn xóa?")) {
      const listAfterDel = courses.filter((course) => course.id !== e.id)
      setCourses(listAfterDel)
    }
  }

  const handleBlur = (e) => {
    if (e.target.name == 'name') {
      if (!e.target.value) {
        setErrname('Vui lòng nhập tên')
      }
    } else if (e.target.name == 'description') {
      if (!e.target.value) {
        setErrDes('Vui lòng nhập mô tả')
      }
    } else if (e.target.name == 'coin') {
      if (!e.target.value) {
        setErrCoin('Vui lòng nhập địa chỉ')
      }
    }
  }

  const handleInput = (e) => {
    if (e.target.name == 'name') {
      setErrname('')
    } else if (e.target.name == 'description') {
      setErrDes('')
    } else if (e.target.name == 'coin') {
      setErrCoin('')
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='hidden' name='id' value={id} />
        <div>
          <label>Tên</label>
          <input type="text" name="name"
            className={errName && 'invalid'}
            value={name}
            onBlur={(e) => handleBlur(e)}
            onInput={(e) => handleInput(e)}
            onChange={(e) => { setName(e.target.value) }}
          />
          <br />
          <span className="form-message">{errName}</span>
        </div>
        <br />
        <div>
          <label>Mô tả</label>
          <input type="text" name="description" size="50"
            className={errDes && 'invalid'}
            value={description}
            onBlur={(e) => handleBlur(e)}
            onInput={(e) => handleInput(e)}
            onChange={(e) => { setDescription(e.target.value) }} />
          <br />
          <span className="form-message">{errDes}</span>
        </div>
        <br />
        <div>
          <label>Giá</label>
          <input type="text" name="coin"
            className={errName && 'invalid'}
            value={coin}
            onBlur={(e) => handleBlur(e)}
            onInput={(e) => handleInput(e)}
            onChange={(e) => { setCoin(e.target.value) }}
          />
          <br />
          <span className="form-message">{errCoin}</span>
        </div>
        <div>
          <button>{isUpdate ? 'Sửa' : 'Thêm'}</button>
        </div>
      </form>
      <ul>
        {courses.map((course, idx) =>
          <li kry={idx}>
            <h2>Name: {course.name}</h2>
            <h3>Description: {course.description}</h3>
            <p>Coin: {course.coin}</p>
            <button onClick={() => handleClickEdit(course)}>Sửa</button>
            <button onClick={() => handleClickDelete(course)}>Xóa</button>
          </li>
        )}
      </ul>
    </>
  );
}

export default App;
