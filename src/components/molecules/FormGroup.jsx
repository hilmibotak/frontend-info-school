import Text from "../atoms/Text"
import Input from "../atoms/Input"

const FormGroup = ({ label, ...inputProps }) => {
  return (
    <div className="mb-4">
      <Text className="font-semibold mb-1 block">{label}</Text>
      <Input {...inputProps} />
    </div>
  )
}

export default FormGroup
