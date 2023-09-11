
import React, { useEffect, useState } from "react";



const HistoryOrderComponent: React.FC = () => {

    return (
<section>
<div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
                <div className="">
                    <h2
                        className="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300 dark:border-gray-700 dark:text-gray-400">
                        Invoices
                    </h2>
                    <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b dark:border-gray-700">
                        <div className="flex items-center pl-3">
                            <p className="text-xs text-gray-400">Show</p>
                            <div className="px-2 py-2 text-xs text-gray-500 ">
                                <select name="" id=""
                                    className="block text-base bg-gray-100 cursor-pointer w-11 dark:text-gray-400 dark:bg-gray-700">
                                    <option value="">15</option>
                                    <option value="">17</option>
                                    <option value="">19</option>
                                </select>
                            </div>
                            <p className="text-xs text-gray-400">entries</p>
                        </div>
                        <div className="flex px-4 py-2 mb-4 border border-gray-300 rounded-md md:mb-0 dark:border-gray-400">
                            <input type="text"
                                className="w-full pr-4 text-sm text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-900 placeholder-text-100 "
                                placeholder="search..."/>
                            <button
                                className="flex items-center text-gray-700 dark:text-gray-400 dark:hover:text-blue-300 hover:text-blue-600">
                                <span className="mr-2 text-xs ">Go</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                                <th className="flex items-center py-3 pl-6 font-medium dark:text-gray-400">
                                    <input className="mr-4" type="checkbox" name="" id=""/>
                                    <span>No.</span>
                                </th>
                                <th className="px-6 py-3 font-medium dark:text-gray-400">Invoice Subject</th>
                                <th className="px-6 py-3 font-medium dark:text-gray-400">Created</th>
                                <th className="px-6 py-3 font-medium dark:text-gray-400">Client</th>
                                <th className="px-6 py-3 font-medium dark:text-gray-400">VAT NO.</th>
                                <th className="px-6 py-3 font-medium dark:text-gray-400">Status</th>
                                <th className="px-6 py-3 font-medium dark:text-gray-400">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="flex items-center px-6 py-3 text-sm font-medium">
                                    <input className="mr-4" type="checkbox" name="" id=""/>
                                    <p className="dark:text-gray-400">1002</p>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">UX Wireframes</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">06.01.2022</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">Adobe</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">837463</span>
                                </td>
                                <td className="px-6 text-sm">
                                    <span
                                        className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-md dark:bg-gray-800 dark:text-gray-400">Paid</span>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    $13
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="flex items-center px-6 py-3 text-sm font-medium">
                                    <input className="mr-4" type="checkbox" name="" id=""/>
                                    <p className="dark:text-gray-400">1002</p>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">Sales presentation</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">11.01.2022</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">Apple</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">09876</span>
                                </td>
                                <td className="px-6 text-sm">
                                    <span
                                        className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-md dark:bg-gray-800 dark:text-gray-400">Paid</span>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    $19
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="flex items-center px-6 py-3 text-sm font-medium">
                                    <input className="mr-4" type="checkbox" name="" id=""/>
                                    <p className="dark:text-gray-400">1002</p>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">Design Works</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">02.07.2022</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">Tabdaq</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">987463</span>
                                </td>
                                <td className="px-6 text-sm">
                                    <span
                                        className="inline-block px-2 py-1 text-orange-700 bg-orange-100 rounded-md dark:bg-gray-800 dark:text-gray-400">Pending</span>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    $22
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="flex items-center px-6 py-3 text-sm font-medium">
                                    <input className="mr-4" type="checkbox" name="" id=""/>
                                    <p className="dark:text-gray-400">1002</p>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">Landing page</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">01.01.2022</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">Bluewolf</td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">74632</span>
                                </td>
                                <td className="px-6 text-sm">
                                    <span
                                        className="inline-block px-2 py-1 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-400">Due
                                        in 3 weeks</span>
                                </td>
                                <td className="px-6 text-sm font-medium dark:text-gray-400">
                                    $46
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-wrap items-center justify-between px-6 py-3">
                        <p className="mb-4 text-xs lg:mb-0 dark:text-gray-400">Showing 1 to 10 of 13 entries</p>
                        <nav aria-label="page-navigation ">
                            <ul className="flex mb-4 list-style-none lg:mb-0">
                                <li className="page-item disabled ">
                                    <a href="#"
                                        className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md pointer-events-none dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600">Previous
                                    </a>
                                </li>
                                <li className="page-item ">
                                    <a href="#"
                                        className="relative block px-3 py-1 mr-1 text-xs text-gray-100 transition-all duration-300 bg-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700">1
                                    </a>
                                </li>
                                <li className="page-item ">
                                    <a href="#"
                                        className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 ">2
                                    </a>
                                </li>
                                <li className="page-item ">
                                    <a href="#"
                                        className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 ">3
                                    </a>
                                </li>
                                <li className="page-item ">
                                    <a href="#"
                                        className="relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 ">Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
    </section>
    )
}
export default HistoryOrderComponent