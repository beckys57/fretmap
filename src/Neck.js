import React from 'react';



const notes = ["A","A#/Bb","B","C","C#/Db","D","D#/Eb","E","F","F#/Db","G","G#/Ab"]

const scalePatterns = {
	major: [2,4,5,7,9,11],
	nminor: [2,3,5,7,8,10], // Natural minor: Flattened 3rd, 6th & 7th
	hminor: [2,3,5,7,8,11], // Harmonic minor: Flattened 3rd & 6th
	penta: [2,4,7,9], // Intervals of [2,4,5,7,9,11] based on major scale
	blues: [3,5,6,7,10], // Intervals of [2,4,5,7,9,11] based on major scale
}

const stringSets = {
	guitar: ["E","B","G","D","A","E"],
	"drop D": ["E","B","G","D","A","D"],
	"DADGAD": ["D","A","G","D","A","D"],
	bass: ["G","D","A","E"],
	violin: ["E","A","D","G"],
	mandolin: ["E","A","D","G"],
}

function intervalFromRoot(index) {
	const newIndex = (index >= notes.length ? index-notes.length : index )
	return newIndex
}

const Fret = ({open, toneColour, pitch}) => {
	const className = "fret tone-colour-"+toneColour+( open === true ? " string-pitch" : "")
	const element = <td className={className}>{pitch}</td>
	// const element = ( open === true ? <td className="string-pitch ">{pitch}</td> : <td className={"fret tone-colour-"+toneColour}>{pitch}</td>)
	return (
		element
	)
}

const String_ = ({scaleNotes,pitch}) => {
		const stringPitch = notes.indexOf(pitch)
		const frets = []//[<Fret key={"".concat(stringPitch,0)} toneColour={scaleNotes.indexOf(stringPitch)} pitch={stringPitch} />]

		for (let step = 0; step < 18; step++) {
			const fretPitch = notes[intervalFromRoot(stringPitch+step)]
			const key = "".concat(pitch,step)
			const toneColour = scaleNotes.indexOf(fretPitch)
			frets.push(
				<Fret open={step === 0 ? true : false} key={key} toneColour={toneColour} pitch={fretPitch} />
			)
		}
		return (
			<tr>
				{frets}
			</tr>
		)

}

const KeyButton = ({note, chosenKey,onClick}) => {
	return (
		<td onClick={() => onClick(note)} className={"key-picker "+(note===chosenKey ? "active" : "")}>{note}</td>
	)
}
const KeyPicker = ({chosenKey, onClick}) => {
	return (
		notes.map( note => {
			return <KeyButton key={notes.indexOf(note)} note={note} chosenKey={chosenKey} onClick={onClick} />
		})	
	)
}

const ScaleButton = ({chosenScale, scale, onClick}) => {
	return (
		<td onClick={() => onClick(scale)} className={"key-picker "+(scale===chosenScale ? "active" : "")}>{scale}</td>
	)
}
const ScalePicker = ({chosenScale, onClick}) => {
	return (
		Object.keys(scalePatterns).map( scale => {
			return <ScaleButton key={scale} scale={scale} chosenScale={chosenScale} onClick={onClick} />
		})	
	)
}

const InstrumentButton = ({chosenInstrument, instrument, onClick}) => {
	return (
		<td onClick={() => onClick(instrument)} className={"key-picker "+(instrument===chosenInstrument ? "active" : "")}>{instrument}</td>
	)
}
const InstrumentPicker = ({chosenInstrument, onClick}) => {
	return (
		Object.keys(stringSets).map( instrument => {
			return <InstrumentButton key={instrument} instrument={instrument} chosenInstrument={chosenInstrument} onClick={onClick} />
		})	
	)
}

class Neck extends React.Component {
	constructor(props) {
		super(props)
		const key = ""

		this.state = {
			key: key,
			scale: "major",
			instrument: "guitar",
			scaleNotes: [],
			rootIndex: notes.indexOf(key),
		}
		this.keyChange = this.keyChange.bind(this)
		this.scaleChange = this.scaleChange.bind(this)
		this.instrumentChange = this.instrumentChange.bind(this)
		this.constructScale = this.constructScale.bind(this)
	}

	constructScale() {
		// Work out scale notes
		const key = this.state.key
		const newRootIndex = notes.indexOf(key)
		this.setState({rootIndex: newRootIndex})
		const scalePattern = scalePatterns[this.state.scale]
		const scaleNotes = [key,]
		for (let interval of scalePattern){
			const newIndex = intervalFromRoot(newRootIndex+interval)
			scaleNotes.push(notes[newIndex])
		}
		this.setState({scaleNotes: scaleNotes})
	}

	keyChange(newKey) {
		this.setState({key: newKey},
			() => this.constructScale()
		)
	}

	scaleChange(newScale) {
		this.setState({scale: newScale},
			() => this.constructScale()
		)
	}

	instrumentChange(newInstrument) {
		console.log('Selecting',newInstrument)
		this.setState({instrument: newInstrument},
			() => this.constructScale()
		)
	}

	stringUp() {
		const pitches = stringSets[this.state.instrument]
		const strings = pitches.map( (pitch, i) => {
			return <String_ key={i} scaleNotes={this.state.scaleNotes} pitch={pitch} />
		})
		return strings
	}

	render() {
		const strings = this.stringUp()
		return (
			<div>
				<table id="neck" className="neck">
					<tbody>
						{strings}
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<KeyPicker chosenKey={this.state.key} onClick={this.keyChange} />

						</tr>
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<ScalePicker chosenScale={this.state.scale} onClick={this.scaleChange} />
						</tr>
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<InstrumentPicker chosenInstrument={this.state.instrument} onClick={this.instrumentChange} />
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}


export default Neck;


// To do: default instrument string sets
// Button to increase/decrease number of strings
// Open strings highlighted on nut
// Button to tune the strings somehow