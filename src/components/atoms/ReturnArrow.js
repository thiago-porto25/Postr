import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function ReturnArrow({ ...props }) {
  return (
    <Link {...props}>
      <BsArrowLeftShort />
    </Link>
  )
}
