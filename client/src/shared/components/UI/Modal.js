import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from './Button';

const Modal = (props) => {
    const { show, closeHandler, formError, inputs, modalTitle } = props;

    const updateHandler = () => {
		// update kanban
        closeHandler();
    }

	return (
		<>
			<Transition appear show={show} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeHandler}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title
										as='h3'
										className='text-lg font-medium leading-6 text-blue-600'
									>
										{modalTitle}
									</Dialog.Title>
                                    
									<div className='mt-4'>
                                        { inputs }
									</div>

									<div className='mt-2'>
										<Button
											type='button'
											className={`inline-flex justify-center rounded-md border border-transparent  px-4 py-2 mr-5 text-sm font-medium ${formError ? 'bg-slate-300' : 'bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'}`}
											onClick={updateHandler}
											disabled={formError}
										>
											Update
										</Button>

                                        <Button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
											onClick={closeHandler}
										>
											Close
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default Modal;