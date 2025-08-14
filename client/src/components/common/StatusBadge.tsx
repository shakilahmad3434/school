import type { FC } from "react"

interface StatusBadgeInterface {
    status: string
}

const paymentStatusConfig: any = {
  paid: {
    text: "Paid",
    bgColor: "from-green-500 to-green-600",
    from: "from-green-600",
    to: "to-green-700"
  },
  due: {
    text: "Due",
    bgColor: "from-red-500 to-red-600",
    from: "from-red-600",
    to: "to-red-700"
  },
  pending: {
    text: "Pending",
    bgColor: "from-yellow-500 to-yellow-600",
    from: "from-yellow-600",
    to: "to-yellow-700"
  },
};

const StatusBadge: FC<StatusBadgeInterface> = ({status = "pending"}) => {
    const config = paymentStatusConfig[status.toLowerCase()] || paymentStatusConfig.pending;

  return (
    <span className={`bg-gradient-to-r ${config.bgColor} text-white px-4 py-2 rounded-full text-xs font-medium hover:${config.from} hover:${config.to} transition-all duration-300 cursor-pointer transform hover:scale-105 capitalize`}>
                                            {config.text}
                                        </span>
  )
}

export default StatusBadge