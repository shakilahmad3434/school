import { BookOpen, CheckCircle, GraduationCap, Users } from 'lucide-react'

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transform Your School Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how EduManage Pro helps schools save time, improve communication, 
              and enhance the educational experience for everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Administrators</h3>
              <p className="text-gray-600">
                Reduce paperwork by 80%, streamline admissions, and get real-time 
                insights into school performance with comprehensive dashboards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Teachers</h3>
              <p className="text-gray-600">
                Spend more time teaching with automated grading, easy attendance tracking, 
                and seamless parent communication tools.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Students & Parents</h3>
              <p className="text-gray-600">
                Stay connected with real-time updates, easy access to grades, 
                and improved communication with teachers and school staff.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Join 500+ Schools Already Using EduManage Pro
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">95% reduction in administrative time</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">40% improvement in parent satisfaction</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">99.9% uptime reliability</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">24/7 customer support</span>
                  </div>
                </div>
              </div>
              <div className="lg:text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                  <span className="text-4xl font-bold text-white">500+</span>
                </div>
                <p className="text-gray-600 text-lg">
                  Schools worldwide trust EduManage Pro to handle their daily operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Benefits