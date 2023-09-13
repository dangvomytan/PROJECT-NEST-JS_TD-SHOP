import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'
import FilterComponent from '../filters/filter.Component'
import PaginationComponent from '../pagination/Pagination.Component'
import { ProductApi } from '../../models/product.Model'
import { useDispatch } from 'react-redux'
import { setProducts } from '../../redux/slice/product.Slice'
import { useLocation } from 'react-router-dom'

const SearchComponent: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get('search' || '');


  const [pages, setPages] = useState<number>(1);
  const [filters, setFilters] = useState<string>('');

  // ham xu li goi api
  const handleCallData = async () => {
    try {
      const dataApi: any = await ProductApi.getAllProVerWithPage(pages, filters,searchValue);
      dispatch(setProducts(dataApi))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    handleCallData();
  }, [pages, filters, searchValue])
  return (
    <div>
      <div>
        <main className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 pt-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              {/* //MENU DROPDOWN */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div> */}
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* // BUTTON  */}
              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              // onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div>
                <FilterComponent filters={filters} setFilters={setFilters} setPages={setPages} />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* //================================================================
                // === SHOW PRODUCT === */}
                <PaginationComponent pages={pages} setPages={setPages} />
                {/* //================================================================ */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
export default SearchComponent
