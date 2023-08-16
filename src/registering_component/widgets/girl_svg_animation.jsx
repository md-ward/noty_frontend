import YellowNote from '/assets/girl/Asset 1.svg'
import BigNote from '/assets/girl/Asset 2.svg'
import Girl from '/assets/girl/Asset 3.svg'
import SmallNote from '/assets/girl/Asset 4.svg'
import DotesBackground from '/assets/girl/Asset 5.svg'
import LampBackground from '/assets/girl/Asset 6.svg'
import TwoArrows from '/assets/girl/Asset 7.svg'
import plant from '/assets/girl/Asset 8.svg'
import TableLine from '/assets/girl/Asset 9.svg'

const Girl_Animation = () => {
    return (<>
        <div className=' relative w-full h-full flex flex-col justify-end  pl-2'>
            <img src={Girl} alt="" className='z-20 w-1/2 mx-2 my-2 ' />
            <img src={BigNote} alt="" className='absolute w-1/3 z-10 left-1/3   bottom-1/4' />
            <img src={LampBackground} className='absolute w-1/2  top-1/4 z-10' />
            <img src={plant} className='absolute w-20  bottom-28 -my-4 left-96 ml-52 z-40' />
            <img src={TableLine} className='absolute bottom-1/4 -my-3 w-1/2 left-1/4   z-10  ' />
            <img src={TwoArrows} className='absolute w-32  bottom-64  -my-4 left-96 ml-52 z-30' />

            <img src={DotesBackground} className='absolute inset-0 z-0' />


        </div>

    </>);
}

export default Girl_Animation;