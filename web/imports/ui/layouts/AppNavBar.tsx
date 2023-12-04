import React, { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Modules from '../../modules';
import { isMobile } from '/imports/libs/deviceVerify';
import { appNavBarStyle } from './AppNavBarStyle';
import AppBar from '@mui/material/AppBar';
import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import Toolbar from '@mui/material/Toolbar';
import * as appStyle from '/imports/materialui/styles';
import Container from '@mui/material/Container';
import { IAppMenu } from '/imports/modules/modulesTypings';
import { Avatar, FormControlLabel, Menu, MenuItem, Tooltip } from '@mui/material';
import Switch from '@mui/material/Switch';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import Box from '@mui/material/Box';
import { DayNightToggle } from './components/DayNightToggle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const HomeIconButton = ({ navigate }: any) => {
	return (
		<Box onClick={() => navigate('/')} sx={fixedMenuLayoutStyle.containerHomeIconButton}>
			<img style={fixedMenuLayoutStyle.homeIconButton} src="/images/wireframe/principal_branca_horizontal.png" />
		</Box>
	);
};

interface IAppNavBar extends ILayoutProps {}

export const AppNavBar = (props: IAppNavBar) => {
	const navigate = useNavigate();
	const location = useLocation();

	const { user, theme, themeOptions, showDrawer, showWindow } = props;

	const [anchorEl, setAnchorEl] = useState<Object | null>(null);
	const open = Boolean(anchorEl);

	const openPage = (url: string) => () => {
		handleClose();
		navigate(url);
	};

	const viewProfile = () => {
		handleClose();
		showDrawer && showDrawer({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
	};

	const viewProfileMobile = () => {
		handleClose();
		showWindow && showWindow({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
	};

	const handleMenu = (event: React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const pathIndex = (Modules.getAppMenuItemList() || [])
		.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
		.findIndex(
			(menuData) =>
				(menuData?.path === '/' && location.pathname === '/') ||
				(menuData?.path !== '/' && location && location.pathname.indexOf(menuData?.path as string) === 0)
		);
	if (isMobile) {
		return (
			<Box
				sx={{
					minHeight: 55,
					width: '100%',
					backgroundColor: theme.palette.primary.main
				}}>
				<FormControlLabel
					control={
						<Switch
							color={'secondary'}
							value={themeOptions?.isDarkThemeMode}
							onChange={(evt) => themeOptions?.setDarkThemeMode(evt.target.checked)}
						/>
					}
					label="DarkMode"
				/>
				<Box sx={{ width: '100%' }}>
					{(Modules.getAppMenuItemList() || [])
						.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
						.map((menuData, menuIndex) => (
							<Button key={menuData?.path} onClick={() => navigate(menuData?.path as string)}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: isMobile ? 'column' : 'row',
										alignItems: 'center',
										justifyContent: 'center',
										paddingTop: 10
									}}>
									{menuData?.icon ? menuData?.icon : null}
								</Box>
							</Button>
						))}
				</Box>
				<IconButton onClick={viewProfileMobile} style={{ position: 'absolute', right: 10, bottom: 13 }}>
					<AccountCircle style={appNavBarStyle.accountCircle} />
				</IconButton>
			</Box>
		);
	}

	return (
		<Container sx={appNavBarStyle.containerNavBar} maxWidth={false}>
			<HomeIconButton navigate={navigate} />

			<DayNightToggle
				isDarkMode={themeOptions?.isDarkThemeMode as boolean}
				setDarkMode={(evt) => {
					themeOptions?.setDarkThemeMode(evt.target.checked);
				}}
			/>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					border: '1px solid #CCC',
					borderRadius: 2,
					padding: 1,
					color: theme.palette.primary.main
				}}>
				<Button
					variant={'contained'}
					color={'secondary'}
					sx={{
						minWidth: 15,
						minHeight: 15,
					}}
					onClick={() => themeOptions?.setFontScale(themeOptions?.fontScale * 0.85)}>
					{'-'}
				</Button>
				<Box sx={{color: 'white', marginLeft: 2, marginRight: 2}}>
					texto
				</Box>
				<Button
					variant={'contained'}
					color={'secondary'}
					sx={{
						minWidth: 15,
						minHeight: 15,
					}}
					onClick={() => themeOptions?.setFontScale(themeOptions?.fontScale * 1.15)}>
					{'+'}
				</Button>
			</Box>
			<Toolbar sx={fixedMenuLayoutStyle.toolbarFixedMenu}>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end'
					}}>
					{(Modules.getAppMenuItemList() || [])
						.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
						.map((menuData, ind) => (
							<Button
								color="secondary"
								variant={'contained'}
								sx={{
									...appNavBarStyle.buttonMenuItem
								}}
								key={menuData?.path}
								onClick={() => navigate(menuData?.path as string)}>
								{menuData?.name}
							</Button>
						))}
				</Box>
			</Toolbar>
			<Tooltip title="Preferências">
				<IconButton
					onClick={handleMenu}
					sx={{ ml: 2 }}
					aria-controls={open ? 'account-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}>
					<AccountCircle id="Perfil" name="Perfil" style={{ color: 'white', fontSize: 30 }} />
				</IconButton>
			</Tooltip>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl as Element}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				open={open}
				onClose={handleClose}>
				{!user || !user._id
					? [
							<MenuItem key={'signin'} onClick={openPage('/signin')}>
								Entrar
							</MenuItem>
					  ]
					: [
							<MenuItem key={'userprofile'} onClick={viewProfile}>
								{user.username || 'Editar'}
							</MenuItem>,

							<MenuItem key={'signout'} onClick={openPage('/signout')}>
								<ExitToAppIcon fontSize="small" style={{color: 'red'}}/> 
								<Box style={{color: 'red'}}> Sair </Box>
							</MenuItem>
					  ]}
			</Menu>
		</Container>
	);
};
