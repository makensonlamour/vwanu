import React from 'react';

const NavbarMobile = () =>{
    return(
        <div className="flex items-center justify-center min-h-screen">
	<div className="flex flex-col">
	
		<div className="w-full max-w-md px-7 py-10 mx-auto bg-white rounded-2xl shadow-xl">

			<div className="px-5 pt-3 bg-white shadow-lg rounded-2xl">
				<div className="flex flex-row space-x-3">
					
					<div className="flex group">
						<a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
							<span className="flex flex-col items-center">
							
								<i className="mdi mdi-home-outline mdi-24px mx-1 text-gray-500 group-hover:text-gray-700
									transition-color duration-200"></i>

								
								<span className="text-xs mb-2 transition-all duration-200">
									Home
								</span>

								
								<span className="h-2 w-2 rounded-full group-hover:bg-yellow-500
									transition-all duration-150 delay-100"></span>
							</span>
						</a>
					</div>

				
					<div className="flex group">
						<a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
							<span className="flex flex-col items-center">
								
								<i className="mdi mdi-compass-outline mdi-24px mx-1 text-gray-500 group-hover:text-gray-700
									transition-color duration-200"></i>

								
								<span className="text-xs mb-2 transition-all duration-200">
									Explore
								</span>

								
								<span className="h-2 w-2 rounded-full group-hover:bg-yellow-500
									transition-all duration-150 delay-100"></span>
							</span>
						</a>
					</div>

					
					<div className="flex group">
						<a href="#" className="p-3 text-yellow-500 hover:text-yellow-500">
							<span className="flex flex-col items-center">
								
								<i className="mdi mdi-layers-outline mdi-24px mx-1 text-gray-700 group-hover:text-gray-700
									transition-color duration-200"></i>

						
								<span className="text-xs mb-2 transition-all duration-200">
									Feeds
								</span>

								
								<span className="h-1 w-5 rounded-full bg-yellow-500 group-hover:bg-yellow-500
									hover:h-3 hover:w-3 transition-all duration-150 delay-100"></span>
							</span>
						</a>
					</div>

					
					<div className="flex group">
						<a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
							<span className="flex flex-col items-center">
							
								<i className="mdi mdi-basket-plus-outline mdi-24px mx-1 text-gray-500 group-hover:text-gray-700
									transition-color duration-200"></i>

								
								<span className="text-xs mb-2 transition-all duration-200">
									Cart
								</span>

							
								<span className="h-2 w-2 rounded-full group-hover:bg-yellow-500
									transition-all duration-150 delay-100"></span>
							</span>
						</a>
					</div>

					
					<div className="flex group">
						<a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
							<span className="flex flex-col items-center">
								
								<i className="mdi mdi-account-circle-outline mdi-24px mx-1 text-gray-500 group-hover:text-gray-700
									transition-color duration-200"></i>


								<span className="text-xs mb-2 transition-all duration-200">
									Account
								</span>

								<span className="h-2 w-2 rounded-full group-hover:bg-yellow-500
									transition-all duration-150 delay-100"></span>
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    );
}

export default NavbarMobile;