import { FaUserCircle, FaTemperatureHigh } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { SiPowerbi } from "react-icons/si";
import { MdOutlineSensors } from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbRulerMeasure } from "react-icons/tb";
const menus = [
    {
        id: 1,
        name: "Login",
        description: "Esta é a pagina de Login",
        icon: null,
        href: "/",
        isVisible: false,
    },
    {
        id: 2,
        name: "Registrar",
        description: "Esta é a tela de cadastro de usuário",
        icon: null,
        href: "/register",
        isVisible: false,
    },
    {
        id: 3,
        name: "Indicadores",
        description: "Esta é a pagina de indicadores",
        icon: BsGraphUpArrow,
        href: "/home",
        isVisible: true,
    },
    {
        id: 4,
        name: "Usuário",
        description: "Esta tela é utilizada para visualização de dados do usuário",
        icon: FaUserCircle,
        href: "/user",
        isVisible: true,
    },
    {
        id: 5,
        name: "Configurações",
        description: "Esta tela é utilizada para realizar configurações do sistema",
        icon: FaGear,
        href: "/config",
        isVisible: true,
    },
    {
        id: 6,
        name: "Tipos de Sensores",
        description: "Esta é a tela de cadastro de tipos de sensores",
        icon: FaTemperatureHigh,
        href: "/sensorType/search",
        isVisible: true,
    },
    {
        id: 7,
        name: "Sensor",
        description: "Esta é a tela de cadastro de sensor",
        icon: MdOutlineSensors,
        href: "/sensor/search",
        isVisible: true,
    },
    {
        id: 8,
        name: "Planta",
        description: "Esta é a tela de cadastro de plantas",
        icon: RiPlantFill,
        href: "/plant/search",
        isVisible: true,
    },
    {
        id: 9,
        name: "Unidades de Medida",
        description: "Esta é a tela de cadastro de unidades de medida",
        icon: TbRulerMeasure,
        href: "/measureUnit/search",
        isVisible: true,
    },
    {
        id: 10,
        name: "Relatórios",
        description: "Esta tela é utilizada para consultar relatórios",
        icon: SiPowerbi,
        href: "/reports",
        isVisible: true,
    },
];

export default menus;