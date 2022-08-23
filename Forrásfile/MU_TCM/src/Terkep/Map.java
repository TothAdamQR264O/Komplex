package Terkep;

import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import Oraren.Timetable;
import Program.FileManager;
import Program.Menu;
import SulyozattAtlagSzamitas.SatlagSz;

import java.awt.BorderLayout;
import javax.swing.JComboBox;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.RenderingHints;

import javax.swing.SwingConstants;
import javax.swing.ScrollPaneConstants;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.awt.event.ActionEvent;

public class Map extends JFrame {

	private JPanel contentPane;

	

	public Map() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 800, 500);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setExtendedState(JFrame.MAXIMIZED_BOTH);

		setContentPane(contentPane);
		contentPane.setLayout(new BorderLayout(0, 0));
		
		JPanel KozepPanel = new JPanel();
		contentPane.add(KozepPanel, BorderLayout.CENTER);
		KozepPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JScrollPane scrollPane = new JScrollPane();
		KozepPanel.add(scrollPane);
		
		JLabel lblMap = new JLabel("");
		lblMap.setFont(new Font("Tahoma", Font.PLAIN, 11));
		lblMap.setHorizontalAlignment(SwingConstants.CENTER);
		scrollPane.setViewportView(lblMap);
		lblMap.setIcon(new ImageIcon("Data\\MEmap.png"));
		
		JPanel BalPanel = new JPanel();
		contentPane.add(BalPanel, BorderLayout.WEST);
		BalPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JButton btnZoomIN = new JButton("+");
		btnZoomIN.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int w = lblMap.getWidth();
				int h = lblMap.getHeight();
				lblMap.setIcon(new ImageIcon(ZoomImage(w+100, h+100)));
			}
		});
		BalPanel.add(btnZoomIN);
		
		JButton btnZoomOUT = new JButton("-");
		btnZoomOUT.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int w = lblMap.getWidth();
				int h = lblMap.getHeight();
				lblMap.setIcon(new ImageIcon(ZoomImage(w-100, h-100)));
			}
		});
		BalPanel.add(btnZoomOUT);
		
		JPanel AlsoPanel = new JPanel();
		contentPane.add(AlsoPanel, BorderLayout.SOUTH);
		AlsoPanel.setLayout(new BorderLayout(0, 0));
		
		JPanel GombokPanel = new JPanel();
		AlsoPanel.add(GombokPanel, BorderLayout.SOUTH);
		
		JButton btnNewButton = new JButton("Menü");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Menu menu = new Menu();
				dispose();
				menu.setVisible(true);
			}
		});
		GombokPanel.add(btnNewButton);
	}
	
	public Image ZoomImage(int w, int h) {
		BufferedImage bImage = new BufferedImage(w, w, BufferedImage.TYPE_INT_RGB);
		Graphics2D grf = bImage.createGraphics();
		try {
			Image img = ImageIO.read(new File("Data\\MEmap.png"));
			grf.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
			grf.drawImage(img, 0, 0, w, h, null);
			grf.dispose();
		}catch(Exception ie) {
			System.out.println(ie.getMessage());
		}
		return bImage;
	}
}
