const Attendance = () => {
    return (
        <div className="px-12 py-12">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      {/* <!-- Date Navigation --> */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h2 id="currentMonth" className="text-xl font-semibold text-gray-900">December 2024</h2>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* <!-- Filters and Actions --> */}
      <div className="flex flex-wrap items-center space-x-4">
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Classes</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>History</option>
        </select>
        
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Take Attendance
        </button>
      </div>
    </div>
  </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                {/* <!-- Calendar Header --> */}
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                    <div className="p-4 text-center text-sm font-medium text-gray-700">
                        Sun
                    </div>
                    <div className="p-4 text-center text-sm font-medium text-gray-700">
                        Mon
                    </div>
                    <div className="p-4 text-center text-sm font-medium text-gray-700">
                        Tue
                    </div>
                    <div className="p-4 text-center text-sm font-medium text-gray-700">
                        Wed
                    </div>
                    <div className="p-4 text-center text-sm font-medium text-gray-700">
                        Thu
                    </div>
                    <div className="p-4 text-center text-sm font-medium text-gray-700">
                        Fri
                    </div>
                    <div className="p-4 text-center text-sm font-medium text-gray-700">
                        Sat
                    </div>
                </div>

                {/* <!-- Calendar Body --> */}
                <div id="calendarBody" className="grid grid-cols-7">
                    {/* <!-- Week 1 --> */}
                    <div className="p-4 h-24 border-b border-r border-gray-200 text-gray-400">
                        <span className="text-sm">26</span>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 text-gray-400">
                        <span className="text-sm">27</span>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 text-gray-400">
                        <span className="text-sm">28</span>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 text-gray-400">
                        <span className="text-sm">29</span>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 text-gray-400">
                        <span className="text-sm">30</span>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">1</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">2</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>

                    {/* <!-- Week 2 --> */}
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">3</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">4</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200 bg-blue-100 hover:border-blue-300">
                        <span className="text-sm font-medium text-blue-600">
                            5
                        </span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">6</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">7</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">8</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">9</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>

                    {/* <!-- Additional weeks would continue here --> */}
                    {/* <!-- Week 3 --> */}
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">10</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">11</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">12</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">13</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">14</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-r border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">15</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                    <div className="p-4 h-24 border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <span className="text-sm font-medium">16</span>
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full inline-block"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* <!-- Legend --> */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
          <span className="text-sm text-gray-700">Present (90%+)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
          <span className="text-sm text-gray-700">Partial (70-89%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
          <span className="text-sm text-gray-700">Low (&lt;70%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
          <span className="text-sm text-gray-700">No Classes</span>
        </div>
      </div>
    </div>

    {/* <!-- Today's Summary --> */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Classes</span>
          <span className="text-sm font-medium text-gray-900">8</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Students Present</span>
          <span className="text-sm font-medium text-green-600">234</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Students Absent</span>
          <span className="text-sm font-medium text-red-600">18</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Attendance Rate</span>
          <span className="text-sm font-medium text-blue-600">92.9%</span>
        </div>
      </div>
    </div>

    {/* <!-- Quick Actions --> */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Take Attendance
        </button>
        <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
          Export Report
        </button>
        <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          View Details
        </button>
      </div>
    </div>
  </div>


  <div id="takeAttendanceModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" aria-modal="true" aria-hidden="false">
    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
      {/* <!-- Modal Header --> */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Take Attendance - December 5, 2024</h3>
        <button className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {/* <!-- Modal Body --> */}
      <div className="mt-6">
        {/* <!-- Class Selection --> */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Mathematics - Grade 11</option>
            <option>Physics - Grade 12</option>
            <option>Chemistry - Grade 11</option>
            <option>English - Grade 10</option>
          </select>
        </div>

        {/* <!-- Student List --> */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full mr-3" src="https://avatar.iran.liara.run/public/10" alt="Student" />
              <div>
                <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                <div className="text-xs text-gray-500">STU001</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors duration-200">Present</button>
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors duration-200">Absent</button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-md hover:bg-yellow-700 transition-colors duration-200">Late</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full mr-3" src="https://avatar.iran.liara.run/public/11" alt="Student" />
              <div>
                <div className="text-sm font-medium text-gray-900">Michael Chen</div>
                <div className="text-xs text-gray-500">STU002</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors duration-200">Present</button>
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors duration-200">Absent</button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-md hover:bg-yellow-700 transition-colors duration-200">Late</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full mr-3" src="https://avatar.iran.liara.run/public/12" alt="Student" />
              <div>
                <div className="text-sm font-medium text-gray-900">Emma Davis</div>
                <div className="text-xs text-gray-500">STU003</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors duration-200">Present</button>
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors duration-200">Absent</button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-md hover:bg-yellow-700 transition-colors duration-200">Late</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full mr-3" src="https://avatar.iran.liara.run/public/13" alt="Student" />
              <div>
                <div className="text-sm font-medium text-gray-900">Alex Rodriguez</div>
                <div className="text-xs text-gray-500">STU004</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors duration-200">Present</button>
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors duration-200">Absent</button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-md hover:bg-yellow-700 transition-colors duration-200">Late</button>
            </div>
          </div>
        </div>

        {/* <!-- Modal Footer --> */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="attendanceDetailsModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 hidden" aria-modal="true" aria-hidden="true">
    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
      {/* <!-- Modal Header --> */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Attendance Details - December 5, 2024</h3>
        <button className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {/* <!-- Modal Body --> */}
      <div className="mt-6">
        {/* <!-- Summary Stats --> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">234</div>
            <div className="text-sm text-green-700">Present</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">18</div>
            <div className="text-sm text-red-700">Absent</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <div className="text-sm text-yellow-700">Late</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">92.9%</div>
            <div className="text-sm text-blue-700">Rate</div>
          </div>
        </div>

        {/* <!-- Class Breakdown --> */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Mathematics - Grade 11</h4>
              <span className="text-sm text-gray-500">9:00 AM - 10:00 AM</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-600">Present: 28</span>
              <span className="text-red-600">Absent: 2</span>
              <span className="text-yellow-600">Late: 1</span>
              <span className="text-blue-600">Rate: 93.5%</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Physics - Grade 12</h4>
              <span className="text-sm text-gray-500">10:15 AM - 11:15 AM</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-600">Present: 25</span>
              <span className="text-red-600">Absent: 3</span>
              <span className="text-yellow-600">Late: 0</span>
              <span className="text-blue-600">Rate: 89.3%</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Chemistry - Grade 11</h4>
              <span className="text-sm text-gray-500">11:30 AM - 12:30 PM</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-600">Present: 30</span>
              <span className="text-red-600">Absent: 1</span>
              <span className="text-yellow-600">Late: 2</span>
              <span className="text-blue-600">Rate: 97.0%</span>
            </div>
          </div>
        </div>

        {/* <!-- Modal Footer --> */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Export Report
          </button>
        </div>
      </div>
    </div>
  </div>
        </div>
    );
};

export default Attendance;
