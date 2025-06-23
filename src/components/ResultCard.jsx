import { FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi'

export default function ResultCard({ type, title, description }) {
  const iconMap = {
    danger: <FiAlertTriangle className="text-red-500" />,
    warning: <FiAlertCircle className="text-yellow-500" />,
    info: <FiInfo className="text-blue-500" />
  }
  
  const bgColorMap = {
    danger: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50'
  }
  
  const borderColorMap = {
    danger: 'border-red-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200'
  }

  return (
    <div className={`p-4 border rounded-lg ${bgColorMap[type]} ${borderColorMap[type]}`}>
      <div className="flex">
        <div className="mr-3 mt-0.5">
          {iconMap[type]}
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}